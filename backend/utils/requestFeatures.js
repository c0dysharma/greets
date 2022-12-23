class RequestFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Remove MongoDB functions
    const queryToBeRemoved = ['fields', 'limit', 'page', 'sort'];
    const queryCopy = { ...this.queryString };
    queryToBeRemoved.forEach((option) => delete queryCopy[option]);

    // Apply MongoDB projections
    let queryStr = JSON.stringify(queryCopy);
    // adds $ before gt, gte, lte, lt to make compatible with mongodb query options
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // replace sort=x,y with sort=x y
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // if no sorting asked sort by created last
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // replace fileds=x,y with fields=x y
      const limitedFields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(limitedFields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // x 1 changes string to int
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = RequestFeatures;
