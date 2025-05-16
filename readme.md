## Métodos recomendados para UserController

register: Registrar un nuevo usuario.

login: Autenticar usuario y devolver un token.

getProfile: Obtener información del perfil del usuario.

updateProfile: Modificar datos como nombre, avatar, etc.

changePassword: Permitir cambiar la contraseña.

deleteUser: Eliminar la cuenta del usuario.

getLeaderboard: Obtener el ranking de jugadores.

updateScore: Actualizar la puntuación o progreso del usuario.

## Métodos recomendados para UserService

createUser(data): Crea un nuevo usuario después de validar los datos.

authenticateUser(credentials): Verifica usuario y contraseña, y genera el token.

findUserById(id): Busca y devuelve datos del usuario.

updateUser(id, data): Actualiza información del usuario.

changeUserPassword(id, oldPass, newPass): Cambia la contraseña de forma segura.

deleteUser(id): Elimina el usuario de la base de datos.

updateUserScore(id, score): Actualiza la puntuación o progreso.

getLeaderboard(): Devuelve el ranking de jugadores.