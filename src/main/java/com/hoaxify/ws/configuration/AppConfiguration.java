package com.hoaxify.ws.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix="hoaxify") //projeye özel propertiler yaml dosyasından erişilecek
public class AppConfiguration {
    private String uploadPath;
    

}
