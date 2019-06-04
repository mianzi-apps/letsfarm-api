class QueryBuilder{
    
    createValues(object){
        let values = Object.values(object);
        values = values.map(item => 
            ((item===null || item ==='')? '000mmnn' : "'"+item+"'")
        );
        
        return values.join(',').replace(/000mmnn/g,"''");
    }

    createWhereClause(object){
        let clause = "";
        Object.keys(object).map((key)=>{
            clause+=key+"='"+object[key]+"' and "
        });
        return clause.substring(0,clause.length-4);
    }

    createKeyValues(object){
        let clause = "";
        Object.keys(object).map((key)=>{
            clause+=key+"='"+object[key]+"' ,"
        });
        return clause.substring(0,clause.length-1);
    }

    insert(table,object){
        const columns = Object.keys(object).join(',');
        const values = new QueryBuilder().createValues(object)
        return `INSERT INTO ${table}(${columns}) VALUES (${values});`;
    }
    
    fetch(table,columns,object){
        const whereClause = new QueryBuilder().createWhereClause(object);
        return `SELECT ${columns} FROM ${table} WHERE ${whereClause}`;
    }

    fetchAll(table,columns){
        return `SELECT ${columns} FROM ${table} `;
    }
    
    update(table,object,whereClause){
        const setString = new QueryBuilder().createKeyValues(object);
        return `UPDATE ${table} SET ${setString} WHERE ${whereClause}`;
    }
    
    deleteFromTable(table,whereClause){
        return `DELETE FROM ${table} WHERE ${whereClause}`;
    }

}


export default new QueryBuilder();
