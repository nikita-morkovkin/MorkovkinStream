import {
  Body,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface AccountDeletionProps {
  domain: string;
}

const AccountDeletionTemplate = ({ domain }: AccountDeletionProps) => {
  return (
    <Html>
      <Head />
      <Preview>Аккаунт удален</Preview>
      <Tailwind>
        <Body className='mx-auto max-w-2xl p-6 bg-slate-50'>
          <Section className='text-center mb-8'>
            <Heading className='text-3xl text-black font-bold'>
              Ваш аккаунт был удален
            </Heading>
            <Text className='text-base text-black'>
              Ваш аккаунт был успешно удален из нашей базы данных после
              деактивации. Нам жаль, что вы уходите.
            </Text>
          </Section>
          <Section className='text-center mb-8'>
            <Text className='text-gray-600'>
              Если вы хотите зарегистрироваться снова, пожалуйста, перейдите по
              ссылке
            </Text>
            <Link href={`https://${domain}/register`} className='text-blue-600'>
              {`https://${domain}/register`}
            </Link>
          </Section>
          <Section className='text-center'>
            <Text className='text-gray-600'>
              Если у вас есть вопросы, пожалуйста, свяжитесь с нами по адресу
            </Text>
            <Link href='mailto:help@morkovkin.stream' className='text-blue-600'>
              help@morkovkin.stream
            </Link>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AccountDeletionTemplate;
