export default ({ response }: any) => {
    response.status = 404;
    response.body = { msg: "Route not Found" };
};