import {
  Modal as ModalBase,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  click: () => void;
  children: React.ReactNode;
}

export const Modal = ({
  title,
  isOpen,
  onClose,
  click,
  isLoading,
  children,
}: ModalProps) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={onClose} mr={4}>
            Cancelar
          </Button>
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            mr={3}
            onClick={click}
          >
            Reservar horário
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalBase>
  );
};
