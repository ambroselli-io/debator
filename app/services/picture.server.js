import { unstable_parseMultipartFormData } from "remix";

const AWS = require("aws-sdk");
const {
  CELLAR_ADDON_HOST,
  CELLAR_ADDON_KEY_ID,
  CELLAR_ADDON_KEY_SECRET,
  PUBLIC_BUCKET_NAME,
} = require("../config");

const availableFormNames = ["avatar", "backgroundPic"];

export const uploadPublicPicture =
  (customFileName) =>
  async ({ name, stream, filename, encoding, mimetype }) => {
    if (!availableFormNames.includes(name)) {
      stream.resume();
      return;
    }
    // Get the file as a buffer
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const results = await new Promise((resolve, reject) => {
      const s3bucket = new AWS.S3({
        endpoint: CELLAR_ADDON_HOST,
        accessKeyId: CELLAR_ADDON_KEY_ID,
        secretAccessKey: CELLAR_ADDON_KEY_SECRET,
      });
      const params = {
        Bucket: PUBLIC_BUCKET_NAME,
        Key: `${customFileName}.${mimetype.split("/").reverse()[0]}`,
        Body: buffer,
        ContentType: mimetype,
        ACL: "public-read",
        Metadata: { "Cache-Control": "max-age=31536000" },
      };
      s3bucket.upload(params, function (err, data) {
        if (err) return reject(`error in s3 callback: ${err}`);
        resolve(data);
      });
    });
    return results.Location; // the url of the picture
  };

export const uploadPictureAction = async (
  request,
  { pictureName, formName = availableFormNames[0] }
) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadPublicPicture(pictureName)
  );
  const image = formData.get(formName);
  if (!image) return { error: "no image to return ! something wrong" };
  return image;
};
