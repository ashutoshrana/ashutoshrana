import { query } from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User {
  static async create(email, password, firstName, lastName, companyName) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, company_name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, first_name, last_name, company_name, role, is_active`,
      [email, hashedPassword, firstName, lastName, companyName]
    );

    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await query(
      `SELECT id, email, first_name, last_name, company_name, phone, address, role, is_active, created_at
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }

  static async updateProfile(id, data) {
    const { firstName, lastName, companyName, phone, address } = data;

    const result = await query(
      `UPDATE users
       SET first_name = $1, last_name = $2, company_name = $3, phone = $4, address = $5
       WHERE id = $6
       RETURNING id, email, first_name, last_name, company_name, phone, address`,
      [firstName, lastName, companyName, phone, address, id]
    );

    return result.rows[0];
  }

  static async verifyPassword(email, password) {
    const user = await User.findByEmail(email);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) return null;

    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async changePassword(userId, oldPassword, newPassword) {
    const user = await query('SELECT password_hash FROM users WHERE id = $1', [userId]);
    if (!user.rows[0]) return null;

    const passwordMatch = await bcrypt.compare(oldPassword, user.rows[0].password_hash);
    if (!passwordMatch) return false;

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedPassword, userId]);

    return true;
  }
}
