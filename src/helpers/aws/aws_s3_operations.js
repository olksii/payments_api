const s3Client = require('../aws/aws_config.js');
const { Upload } = require('@aws-sdk/lib-storage');
const {DeleteObjectCommand} = require('@aws-sdk/client-s3');

const awsOperations = {

    async uploadFileToS3(file) {
        let filename = ''

        const extension = file.originalname.split('.')[(file.originalname.split('.')).length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        filename = uniqueSuffix + '.' + extension;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${process.env.FOLDER}/${filename}`,
          Body: file.buffer,
        };
      
        try {
          const upload = new Upload({
            client: s3Client,
            params: uploadParams,
          });
          await upload.done();
          return upload.singleUploadResult.Location;
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      },

      async deleteFileFromS3(filename) {
        const deleteParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${process.env.FOLDER}/${filename}`,
        };
      
        try {
          const command = new DeleteObjectCommand(deleteParams);
          await s3Client.send(command);
          console.log(`File deleted successfully: ${filename}`);
          return filename
        } catch (error) {
          console.error('Error deleting file:', error);
          return error
        }
      }
    
}


  module.exports = awsOperations;