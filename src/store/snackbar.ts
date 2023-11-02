import  { create }from 'zustand';

export type AlertColor = 'success' | 'info' | 'warning' | 'error';

interface SnackbarDetailState {
  severity?: AlertColor;
  message?: string;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right' | 'center';
  isOpen?: boolean,
  autoHideDuration?: number
}

interface StoreState {
  snackbarDetail: SnackbarDetailState
}

interface StoreActions {
  showSnackbar: (data: SnackbarDetailState) => void;
  hideSnackbar: () => void
}

const useSnackBarStore = create<StoreState & StoreActions>((set) => ({
  snackbarDetail: {
    severity: 'success',
    message: 'Add a message',
    vertical: 'top',
    horizontal: 'center',
    isOpen: false,
    autoHideDuration: 3000
  },
  hideSnackbar: () => set((state) => ({ snackbarDetail: { ...state.snackbarDetail, isOpen: false }  })),
  showSnackbar: (snackbarDetailData) => set((state) => ({ snackbarDetail: {...state.snackbarDetail, ...snackbarDetailData } })),
}));

export default useSnackBarStore
