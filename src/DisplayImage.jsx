import React,{useEffect,useState} from 'react';
import { getUrl } from 'aws-amplify/storage';

const DisplayImage = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const url = 'https://s3demo28a19-dev.s3.amazonaws.com/s3Image.jpg';
      /*const url = await getUrl({
        path: 's3demo28a19-dev/s3Image.jpg',
        options: {
          validateObjectExistence: true
        },
      });*/
      setImageUrl(url);
      //console.log(url);
    } catch (error) {
      console.log('Error fetching image from S3', error);
    }
  };

  return(
    <div>
      {imageUrl && <img src={imageUrl} style={{ maxWidth: '100%', height: 'auto' }} />}
        </div>

  );
};

export default DisplayImage;
