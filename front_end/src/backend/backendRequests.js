import axios from 'axios';
import FormData from 'form-data';

const base_url = 'http://localhost:5000/'

export function upload_photo(image) {
    // https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios
    let data = new FormData();
    data.append('image', image, image.fileName);
    return axios({
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
        method: 'post',
        url: `${base_url}upload_photo`,
        data: data
    });
}

// ingredients should be an array of strings
export function get_recipes(ingredients, page) {
    let url = `${base_url}get_recipes?page=${page}&ingredients=`;
    ingredients.forEach(element => {
        url += element + ','
    });
    url = url.substring(0, url.length - 1);
    return axios({
        method: 'get',
        url: url
    });
}