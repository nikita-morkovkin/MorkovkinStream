import { GenerateStreamTokenDocument } from '@/graphql/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuid4 } from 'uuid';
import { useAuth } from './useAuth';
import { useCurrentProfile } from './useCurrentProfile';

export function useStreamToken(channelId: string) {
  const [token, setToken] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [identity, setIdentity] = useState<string>('');

  const { isAuth } = useAuth();
  const { user } = useCurrentProfile();

  const [generateStreamToken] = useMutation(GenerateStreamTokenDocument, {
    onCompleted(data) {
      const viewerToken = data.generateStreamToken.token;

      setToken(viewerToken);

      const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
        name?: string;
      };

      const name = decodedToken.name;
      const identity = decodedToken.jti;

      if (name) {
        setName(name);
      }

      if (identity) {
        setIdentity(identity);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    async function generateToken() {
      const userId = isAuth && user ? user.id : uuid4();

      await generateStreamToken({
        variables: {
          data: {
            userId,
            channelId,
          },
        },
      });
    }

    const timeoutId = setTimeout(generateToken, 1000);

    return () => clearTimeout(timeoutId);
  }, [generateStreamToken, isAuth, user, channelId]);

  return { token, name, identity };
}
