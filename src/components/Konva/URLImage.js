import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const URLImage = (props) => {
    const [img] = useImage(props.image);
    return (
      <Image
        image={img}
        width={props.width}
        height={props.height}
        x={props.x}
        y={props.y}
      />
    );
  };

export default URLImage;