import React from 'react';
import defaultPicture from "../assets/profile.png";

const ProfileImageWithDefault = (props) => {

    const {image, tepimage} = props;

    let imageSource = defaultPicture;
    if (image) {
        imageSource = 'images/' +image;
    }

    return (
        <img className="rounded-circle shadow" {...props}
             alt={`profile`} src={tepimage || imageSource}
             //eğer bir hata olursa bu method çağrılacak default resim gösterilecek
             onError={event => {
                 event.target.src = defaultPicture
             }}
        />
            

    );
};

export default ProfileImageWithDefault;
