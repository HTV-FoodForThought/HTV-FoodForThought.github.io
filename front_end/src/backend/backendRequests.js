import axios from 'axios';

const base_url = 'http://loclahost:5000/'

export function upload_photo(image) {
    return axios({
        method: 'post',
        url: `${base_url}upload_photo`,
        data: {
            image: image
        }
    });
}

// ingredients should be an array of strings
export function get_recipes(ingredients, page) {
    let url = `${base_url}get_recipes?page=${page}&ingredients=`;
    ingredients.forEach(element => {
        url += element + ','
    });
    url = ingredients.substring(0, url.length - 1);
    return axios({
        method: 'get',
        url: url
    });
}