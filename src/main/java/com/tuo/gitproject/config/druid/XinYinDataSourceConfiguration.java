//package com.tuo.gitproject.config.druid;
//
//import com.alibaba.druid.pool.DruidDataSource;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import javax.sql.DataSource;
//
//@Configuration
//public class XinYinDataSourceConfiguration {
//
//    @Bean
//    @ConfigurationProperties(prefix = "xinyin.datasource")
//    public DataSource druidDataSource() {
//        DruidDataSource druidDataSource = new DruidDataSource();
//        druidDataSource.setMaxActive(100000);
//        druidDataSource.setMaxWait(10000);
//        return druidDataSource;
//    }
//
//}
