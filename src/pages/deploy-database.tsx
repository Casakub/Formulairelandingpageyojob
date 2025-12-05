import { DatabaseDeployer } from '../components/DatabaseDeployer';

export default function DeployDatabasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-cyan-50">
      <div className="container mx-auto py-12">
        <DatabaseDeployer />
      </div>
    </div>
  );
}
