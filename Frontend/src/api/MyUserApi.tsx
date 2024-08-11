import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const token = await getAccessTokenSilently();
        if (!token) {
            throw new Error('Failed to get access token');
        }
        const response = await fetch(`${API_BASE_URL}/api/v1/my/user/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
    };
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    };
};

type UpdateUserRequest = {
    name: string;
    email: string;
    addressLine1: string;
    city: string;
    country: string;
};

export const useUpdateUser = () => {
    // const {getAccessTokenSilently} = useAuth0();
    
    const updateMyUserRequest = async (formData: UpdateUserRequest) => {
        // const token = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/v1/my/user/`, {
            method: 'PUT',
            headers: {
                // Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        return response.json();
    };
    const {
        mutateAsync: updateUser,
        isLoading,
        error,
        isSuccess,
        reset,  
    } = useMutation(updateMyUserRequest);



    return {
        updateUser,
        isLoading,
    };
}
