export const useAuth = () => {

    const handleAccess = async (token) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/autenticacao`, {headers: {
                'Authorization': token,
            }});
            if (!response.ok) {
                throw new Error(`Failed to load associate data: ${response.statusText}`);
            }
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error loading associate data:', error);
        }
    };


    const user = localStorage.getItem('token')

    if (user){
        const access = handleAccess(user)

        if (access != 'admin'){
            return true
        }
    }    
    return false
};

// modelo pego de https://dev.to/sundarbadagala081/protected-routes-in-react-47b1