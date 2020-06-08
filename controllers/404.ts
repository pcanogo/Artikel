export default ({ response }: any) => {
    response.status = 404;
    response.body = {
        status: 404, 
        msg: "Route not Found" 
    };
};