import { query } from '../config/database.js';

export class Client {
  static async create(userId, data) {
    const { name, email, phone, address, city, state, postalCode, country, taxId } = data;

    const result = await query(
      `INSERT INTO clients (user_id, name, email, phone, address, city, state, postal_code, country, tax_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [userId, name, email, phone, address, city, state, postalCode, country, taxId]
    );

    return result.rows[0];
  }

  static async findById(id, userId) {
    const result = await query(
      'SELECT * FROM clients WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  }

  static async findAllByUser(userId) {
    const result = await query(
      'SELECT * FROM clients WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async update(id, userId, data) {
    const { name, email, phone, address, city, state, postalCode, country, taxId } = data;

    const result = await query(
      `UPDATE clients
       SET name = $1, email = $2, phone = $3, address = $4, city = $5,
           state = $6, postal_code = $7, country = $8, tax_id = $9
       WHERE id = $10 AND user_id = $11
       RETURNING *`,
      [name, email, phone, address, city, state, postalCode, country, taxId, id, userId]
    );

    return result.rows[0];
  }

  static async delete(id, userId) {
    const result = await query(
      'DELETE FROM clients WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );
    return result.rows[0];
  }
}
