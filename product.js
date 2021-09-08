const aws = require("aws-sdk");
const axios = require("axios").default;

module.exports.getDetail = async (event) => {
  const { id } = event.pathParameters;
  try {
    const product = await getProduct(id);
    upload(JSON.stringify(product));
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: "OK",
    }),
  };
};

async function getProduct(id) {
  const { STOREFRONT_ACCESS_TOKEN, SHOPIFY_URL } = process.env;
  const query = ` {
    nodes(ids: "gid://shopify/Product/${id}") {
      ...on Product {
        title
        id
        description
      }
    }
  }`;

  const resp = await axios.post(SHOPIFY_URL, {graphQLParams: { query }}, {
    headers: {
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
  });

  return resp?.data
}

async function upload(content) {
  const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, BUCKET_NAME } = process.env;
  const { v4: uuidv4 } = require("uuid");
  const s3 = new aws.S3({
    apiVersion: "2006-03-01",
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  });

  const key = `${uuidv4()}.json`;
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: content,
    ContentType: "application/json; charset=utf-8",
  };
  try {
    await s3.putObject(params).promise();
  } catch (err) {
    const message = `Error write object ${key} to bucket ${BUCKET_NAME}.`;
    throw new Error(message);
  }
}
