const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://localhost:4000/api/v1";
console.log("baseurl=", BASE_URL);

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories" ,
}