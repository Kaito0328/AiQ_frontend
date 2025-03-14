import { useState, useEffect } from 'react';
import { getLoginUser } from '../api/UserAPI'; // getCurrentUser APIをインポート
import { User } from '../types'; // User型をインポート

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getLoginUser();
        setUser(currentUser);
      } catch (err) {
        setError('ユーザー情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useUser;

