var adminManager = new ActiveXObject('Microsoft.ApplicationHost.WritableAdminManager');
adminManager.CommitPath = "MACHINE/WEBROOT/APPHOST";

var windowsAuthenticationSection = adminManager.GetAdminSection("system.webServer/security/authentication/windowsAuthentication", "MACHINE/WEBROOT/APPHOST/Default Web Site");
windowsAuthenticationSection.Properties.Item("enabled").Value = true;

var extendedProtectionElement = windowsAuthenticationSection.ChildElements.Item("extendedProtection");
extendedProtectionElement.Properties.Item("tokenChecking").Value = "Allow";
extendedProtectionElement.Properties.Item("flags").Value = "None";

var extendedProtectionCollection = extendedProtectionElement.Collection;

var spnElement = extendedProtectionCollection.CreateNewElement("spn");
spnElement.Properties.Item("name").Value = "HTTP/www.contoso.com";
extendedProtectionCollection.AddElement(spnElement);

var spnElement1 = extendedProtectionCollection.CreateNewElement("spn");
spnElement1.Properties.Item("name").Value = "HTTP/contoso.com";
extendedProtectionCollection.AddElement(spnElement1);

adminManager.CommitChanges();