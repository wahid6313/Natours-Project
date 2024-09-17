class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1) FILTERING
    const queryObj = { ...this.queryString };
    const excludedFeild = ['page', 'sort', 'limit', 'fields'];
    excludedFeild.forEach((el) => delete queryObj[el]);

    //2) ADVANCE FILTERING-

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );
    this.query = this.query.find(JSON.parse(queryString));
    // console.log(JSON.parse(queryString));
    return this;
  }

  sort() {
    // let query = Tour.find(JSON.parse(queryString));

    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    // else {
    //   this.query = this.query.select('name');
    // }
    return this;
  }

  paginate() {
    if (this.queryString.page || this.queryString.limit) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 10;
      const skip = (page - 1) * limit;

      this.query = this.query.find().skip(skip).limit(limit);
    }
    return this;
  }
}

module.exports = ApiFeatures;
