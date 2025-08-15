import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "~/server/db";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
// If your Prisma file is located elsewhere, you can change the path

 const polarClient = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN as string,
    server: 'sandbox'
});

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
    enabled: true, 
  }, 

  plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "e07480fe-3300-4a2f-8442-1504c1c3148a", 
                            slug: "small"
                        },
                        {
                            productId: "08ec4361-6975-4baa-bbef-cb202af82818", 
                            slug: "medium"
                        },
                        {
                            productId: "eb27fa27-6675-4565-8473-636949311051", 
                            slug: "large"
                        }

                    ],
                    successUrl: "/",
                    authenticatedUsersOnly: true
                }),
                portal(),
                webhooks({
                  secret: env.POLAR_WEBHOOK_SECRET as string,
                  onOrderPaid: async (order) =>{
                    const externalCustomerId = order.data.customer.externalId;

                    if(!externalCustomerId) {
                      console.error("No external customer ID found.");
                      throw new Error("No external customer id found.");
                    }

                    const productId = order.data.productId;

                    let creditsToAdd = 0;

                    switch(productId){
                      case "e07480fe-3300-4a2f-8442-1504c1c3148a":
                        creditsToAdd = 20;
                        break;
                      case "08ec4361-6975-4baa-bbef-cb202af82818":
                        creditsToAdd = 30;
                        break;
                      case "eb27fa27-6675-4565-8473-636949311051":
                        creditsToAdd = 50;
                        break;
                    }  

                    await db.user.update({
                    where: { id: externalCustomerId },
                    data: {
                      credits: {
                        increment: creditsToAdd,


                },
              },
            });
          },
        }),
      ],
    }),
  ],
});