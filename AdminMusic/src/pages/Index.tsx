
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Chuyển hướng tới trang Dashboard
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
