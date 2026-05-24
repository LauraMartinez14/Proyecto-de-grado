import bcrypt from 'bcrypt';
import User from '../modules/users/user.model';

export async function initializeAdmin() {
  try {
    const admin = await User.findOne({ where: { username: 'admin' } });

    if (!admin) {
      console.log('No se encontró usuario admin. Creando uno por defecto...');
      
      const hashedPassword = await bcrypt.hash('abc123', 10);
      
      await User.create({
        name: 'Admin',
        username: 'admin',
        email: 'admin@deshidratador.com',
        password: hashedPassword,
        dateOfBirth: new Date('1990-01-01'),
      });
    } else {
      console.log('El usuario admin ya existe en la base de datos.');
    }
  } catch (error) {
    console.error('Error al inicializar el admin:', error);
  }
}