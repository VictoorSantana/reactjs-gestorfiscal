export default { 

     
    Rotas:  [
                {
                    id: 1,
                    titulo: 'Papeis',
                    subItem: [
                        {id: 2, titulo: 'Contratos', link: '/PapeisContratos'}
                    ]
                },
                {
                    id: 2,
                    titulo: 'Perfil',
                    subItem: [
                        {id: 6, titulo: 'Usuário', link: '/user'},
                        {id: 7, titulo: 'Configurações', link: '/configuracoes'}
                    ]
                },
                {
                    id: 3,
                    titulo: 'Usuários',
                    subItem: [
                        {id: 8, titulo: 'Cadastrados', link: '/usuarios'}
                    ]
                }
            ]        
}

/*
0: "dashboard-read"
1: "dashboard-admin"
2: "profile-read"
3: "profile-update"
4: "roles-create"
5: "roles-read"
6: "roles-update"
7: "roles-delete"
8: "roles-permissions"
9: "permissions-create"
10: "permissions-read"
11: "permissions-update"
12: "permissions-delete"
13: "users-create"
14: "users-read"
15: "users-update"
16: "users-status"
17: "offices-certificates"
18: "offices-read"
19: "offices-create"
20: "offices-users"
21: "profile-settings"
22: "offices-update"
*/