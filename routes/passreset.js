const profileName = req.body.profileName;
const profileUsername = req.body.profileUsername;
const currentPassword = req.body.profileCurrentPassword;
const newPassword = req.body.profileNewPassword;
....
if (currentPassword && newPassword && bcrypt.compareSync(currentPassword, req.user.encryptedPassword)) {
      // add new encryptedPassword to the updates
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(newPassword, salt); //my comment: here we use new password
      // profileChanges.encryptedPassword = hashPass;
      req.user.encryptedPassword = hashPass;
}