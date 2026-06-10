import { Client } from '../models/Client.js';
import logger from '../utils/logger.js';

export const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.userId, req.body);
    res.status(201).json({ success: true, message: 'Client created successfully', data: client });
  } catch (error) {
    logger.error('Create client error:', error);
    res.status(500).json({ success: false, message: 'Failed to create client' });
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id, req.userId);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, data: client });
  } catch (error) {
    logger.error('Get client error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch client' });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAllByUser(req.userId);
    res.json({ success: true, data: clients });
  } catch (error) {
    logger.error('Get all clients error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch clients' });
  }
};

export const updateClient = async (req, res) => {
  try {
    const client = await Client.update(req.params.id, req.userId, req.body);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, message: 'Client updated successfully', data: client });
  } catch (error) {
    logger.error('Update client error:', error);
    res.status(500).json({ success: false, message: 'Failed to update client' });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const result = await Client.delete(req.params.id, req.userId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    logger.error('Delete client error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete client' });
  }
};
