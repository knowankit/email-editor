import { mountStoreDevtool } from 'simple-zustand-devtools';
import useSurveysStore from '@/store/surveys'

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Surveys', useSurveysStore);
}
