class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {   // searching by name in db so used name 
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};
        this.query = this.query.find({ ...keyword });

        return this;
    }

    // filter on the basis of category , price , rating 
    filter() {

        // all query here 
        const queryCopy = { ...this.queryStr };
        //  fileter for category 
        // remove fileds when filtering via category so remove 'keyword' , 'page' , 'limit'
        const removeFieldsValues = ['keyword', 'page', 'limit'];
        removeFieldsValues.forEach(key => delete queryCopy[key])


        // filter for  price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); // replace will be apply on gt gte lt lte
        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    // pagination 
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}
module.exports = ApiFeatures;
