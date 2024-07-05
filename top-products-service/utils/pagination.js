// utils/pagination.js
function paginate(data, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return data.slice(start, end);
}

module.exports = paginate;
