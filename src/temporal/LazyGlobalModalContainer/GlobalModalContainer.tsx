import { ChoosePlaylistModal } from '@/modals/ChoosePlaylistModal';
import { CreateUserPlaylistModal } from '@/modals/CreateUserPlaylistModal';
import { DialogModal } from '@/modals/DialogModal/ui/DialogModal';
import { AddReportModal } from '@/modals/AddReportModal';
import { ShareVideoModal } from '@/modals/ShareVideoModal';
import { IntegrateVideoModal } from '@/modals/IntegrateVideoModal';
import { AuthModal } from 'rupor-common';

const GlobalModalContainer = () => (
  <>
    <AuthModal />
    <ChoosePlaylistModal />
    <CreateUserPlaylistModal />
    <AddReportModal />
    <DialogModal />
    <ShareVideoModal />
    <IntegrateVideoModal />
  </>
);

export default GlobalModalContainer;
