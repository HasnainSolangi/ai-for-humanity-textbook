import { auth } from "../src/lib/auth";

async function generateSchema() {
    // Better-Auth provides a way to get the schema
    const schema = await auth.generateSchema();
    console.log(schema);
}

generateSchema();
