import React, {useState} from 'react';
import {View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';

const SprtComponent = props => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    props?.onSubmit();
  };

  return (
    <View>
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {props?.data
                ? props?.data
                : 'Sorry you have watched all the Cards. please wait for the next cards.'}
            </Text>

            {props?.twoButtons ? (
              <View>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    closeModal;
                    props?.onSubmit(1);
                  }}>
                  <Text style={styles.modalButtonText}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    closeModal;
                    props?.onSubmit(2);
                  }}>
                  <Text style={styles.modalButtonText}>Go Back</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>OKAY</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ECECEC',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#333333',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SprtComponent;
