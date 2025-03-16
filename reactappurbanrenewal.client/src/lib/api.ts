// API service for connecting to the server
import { User, Project } from '../types';

const API_BASE_URL = '/api';

// Generic API request function with error handling
async function apiRequest<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
  
  if (!response.ok) {
    // Try to get error details from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status}`);
    } catch (e) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
  }

  // For empty responses (like DELETE operations)
  if (response.status === 204) {
    return {} as T;
  }

  return await response.json();
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return await apiRequest<{ token: string, user: User }>('auth/login', 'POST', { email, password });
  },
  
  register: async (username: string, email: string, password: string, role: string) => {
    return await apiRequest<{ token: string, user: User }>('auth/register', 'POST', { 
      username, 
      email, 
      password,
      role
    });
  },
  
  getUser: async (token: string) => {
    return await apiRequest<User>('auth/user', 'GET', undefined, token);
  },
  
  logout: async () => {
    return await apiRequest('auth/logout', 'POST');
  }
};

// Projects API
export const projectsApi = {
  getAll: async (token?: string) => {
    return await apiRequest<any[]>('projects', 'GET', undefined, token);
  },
  
  getById: async (id: number, token?: string) => {
    return await apiRequest<Project>(`projects/${id}`, 'GET', undefined, token);
  },
  
  create: async (data: any, token?: string) => {
    return await apiRequest<any>('projects', 'POST', data, token);
  },
  
  update: async (id: number, data: any, token?: string) => {
    return await apiRequest<any>(`projects/${id}`, 'PUT', data, token);
  },
  
  delete: async (id: number, token?: string) => {
    return await apiRequest<void>(`projects/${id}`, 'DELETE', undefined, token);
  }
};

// Tenders API
export const tendersApi = {
  getAll: async (token?: string) => {
    return await apiRequest<any[]>('tenders', 'GET', undefined, token);
  },
  
  getById: async (id: number, token?: string) => {
    return await apiRequest<any>(`tenders/${id}`, 'GET', undefined, token);
  },
  
  create: async (data: any, token?: string) => {
    return await apiRequest<any>('tenders', 'POST', data, token);
  },
  
  update: async (id: number, data: any, token?: string) => {
    return await apiRequest<any>(`tenders/${id}`, 'PUT', data, token);
  },
  
  delete: async (id: number, token?: string) => {
    return await apiRequest<void>(`tenders/${id}`, 'DELETE', undefined, token);
  }
};

// Customers API
export const customersApi = {
  getAll: async (token?: string) => {
    return await apiRequest<any[]>('customers', 'GET', undefined, token);
  },
  
  getById: async (id: number, token?: string) => {
    return await apiRequest<any>(`customers/${id}`, 'GET', undefined, token);
  },
  
  create: async (data: any, token?: string) => {
    return await apiRequest<any>('customers', 'POST', data, token);
  },
  
  update: async (id: number, data: any, token?: string) => {
    return await apiRequest<any>(`customers/${id}`, 'PUT', data, token);
  },
  
  delete: async (id: number, token?: string) => {
    return await apiRequest<void>(`customers/${id}`, 'DELETE', undefined, token);
  }
};

// Documents API
export const documentsApi = {
  getAll: async (token?: string) => {
    return await apiRequest<any[]>('documents', 'GET', undefined, token);
  },
  
  getById: async (id: number, token?: string) => {
    return await apiRequest<any>(`documents/${id}`, 'GET', undefined, token);
  },
  
  create: async (data: FormData, token?: string) => {
    const headers: HeadersInit = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/documents`, {
      method: 'POST',
      headers,
      body: data,
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  },
  
  delete: async (id: number, token?: string) => {
    return await apiRequest<void>(`documents/${id}`, 'DELETE', undefined, token);
  }
};

// Property Valuations API
export const propertyValuationsApi = {
  getAll: async (token?: string) => {
    return await apiRequest<any[]>('propertyvaluations', 'GET', undefined, token);
  },
  
  getById: async (id: number, token?: string) => {
    return await apiRequest<any>(`propertyvaluations/${id}`, 'GET', undefined, token);
  },
  
  create: async (data: any, token?: string) => {
    return await apiRequest<any>('propertyvaluations', 'POST', data, token);
  },
  
  update: async (id: number, data: any, token?: string) => {
    return await apiRequest<any>(`propertyvaluations/${id}`, 'PUT', data, token);
  },
  
  delete: async (id: number, token?: string) => {
    return await apiRequest<void>(`propertyvaluations/${id}`, 'DELETE', undefined, token);
  }
};

// Reports API
export const reportsApi = {
  getAll: async (token?: string) => {
    return await apiRequest<any[]>('reports', 'GET', undefined, token);
  },
  
  getById: async (id: number, token?: string) => {
    return await apiRequest<any>(`reports/${id}`, 'GET', undefined, token);
  },
  
  create: async (data: any, token?: string) => {
    return await apiRequest<any>('reports', 'POST', data, token);
  },
  
  update: async (id: number, data: any, token?: string) => {
    return await apiRequest<any>(`reports/${id}`, 'PUT', data, token);
  },
  
  delete: async (id: number, token?: string) => {
    return await apiRequest<void>(`reports/${id}`, 'DELETE', undefined, token);
  }
};
