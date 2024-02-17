export const categories: { id: number, name: string }[] = [
    {
        id: 1,
        name: "http",
    },
    {
        id: 2,
        name: "database"
    },
    {
        id: 3,
        name: "miscellaneous"
    },
]

export const list: { name: string, description: string, url: string, category: number }[] = [
    {
        name: "http.zig",
        description: "An HTTP/1.1 server for zig",
        url: "https://github.com/karlseguin/http.zig",
        category: 1
    },
    {
        name: "pg.zig",
        description: "Native PostgreSQL driver / client for Zig",
        url: "https://github.com/karlseguin/pg.zig",
        category: 2
    },
    {
        name: "⚡ Zap ⚡",
        description: "Blazingly fast backends in Zig",
        url: "https://github.com/zigzap/zap",
        category: 1
    },
    {
        name: "log.zig",
        description: "A structured logger for Zig",
        url: "https://github.com/karlseguin/log.zig",
        category: 3
    },
    {
        name: "zqlite.zig",
        description: "A thin SQLite wrapper for Zig",
        url: "https://github.com/karlseguin/zqlite.zig",
        category: 2
    },
    {
        name: "validate.zig",
        description: "A validation framework for Zig",
        url: "https://github.com/karlseguin/validate.zig",
        category: 3
    },
    {
        name: "smtp_client.zig",
        description: "SMTP client for Zig",
        url: "https://github.com/karlseguin/smtp_client.zig",
        category: 3
    }

]

