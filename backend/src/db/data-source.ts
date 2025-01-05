import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    database: "focus-mate",
    port: 5432,
    username: "postgres",
    password: "123456",
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*{.ts,.js}'],
}

const dataSource = new DataSource(dataSourceOptions)
dataSource.initialize()

export default dataSource