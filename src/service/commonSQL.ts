import connection from '../connectMysql'

export const queryTable = (table: string) => {
    return new Promise((resolve, reject) => {
        var sql = 'SELECT * FROM ' + table;
        //查
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                reject(err)
                return;
            }

            // console.log(`--------------------------SELECT-${table}---------------------------`);
            // console.log(result);
            resolve(result)
            // console.log('------------------------------------------------------------\n\n');
        });
    })
}