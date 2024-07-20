import { Client,Account,Databases,Storage } from "appwrite";

const client=new Client();

client
       .setEndpoint('https://cloud.appwrite.io/v1')
       .setProject('669b539f00324aea9eba');

export const account=new Account(client);
export const databases=new Databases(client)
export const storage=new Storage(client)