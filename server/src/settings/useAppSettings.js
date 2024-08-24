const useAppSettings = () => {
  let settings = {};
  settings['admin_email'] = 'Play Together <noreply@play-together.site>';
  settings['base_url'] = 'http://localhost:3000';
  return settings;
};

module.exports = useAppSettings;
