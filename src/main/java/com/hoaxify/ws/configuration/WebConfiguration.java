package com.hoaxify.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	@Autowired
	AppConfiguration appConfiguration;    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        //http://localhost:8080/images/profile.png gibi adreslerde devreye girecek
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:./"+appConfiguration.getUploadPath()+"/")
                //1 yıl saklayacaj bunda sürekli istekatmış olmayacak
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
    }
	
	@Bean
	CommandLineRunner createStorageDirectories() {
		//resmin kaydedileceği dosya yoksa oluşturacack
		return (args) -> {
			createFolder(appConfiguration.getUploadPath());
			createFolder(appConfiguration.getProfileStoragePath());
			createFolder(appConfiguration.getAttachmentStoragePath());
		};
	}
	private void createFolder(String path){
		File folder = new File(path);
		boolean folderExist = folder.exists() && folder.isDirectory();
		if(!folderExist) {
			folder.mkdir();
		}
	}
}
