package com.tuo.gitproject.config.database;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@MapperScan(basePackages = XinYinDataSourceConfig.PACKAGE, sqlSessionFactoryRef = "xinyinSqlSessionFactory")
@EnableTransactionManagement
public class XinYinDataSourceConfig {

    static final String PACKAGE = "com.tuo.gitproject.mapper.mysqlxinyin.*";
    static final String MAPPER_LOCATION = "classpath:mapper/mysqlxinyin/*/*.xml";

    @Value("${xinyin.datasource.url}")
    private String url;

    @Value("${xinyin.datasource.username}")
    private String user;

    @Value("${xinyin.datasource.password}")
    private String password;

    @Value("${master.datasource.driverClassName}")
    private String driverClass;

    @Bean(name = "xinyinDataSource")
    @Primary
    public DataSource xinyinDataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(driverClass);
        dataSource.setUrl(url);
        dataSource.setName(user);
        dataSource.setPassword(password);
        return dataSource;
    }

    @Bean(name = "xinyinTransactionManager")
    @Primary
    public DataSourceTransactionManager xinyinManager() {
        return new DataSourceTransactionManager(xinyinDataSource());
    }

    @Bean(name = "xinyinSqlSessionFactory")
    @Primary
    public SqlSessionFactory xinyinSqlSessionFactory(@Qualifier("xinyinDataSource") DataSource xinyinDataSource) throws Exception {
        final SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();
        configuration.setMapUnderscoreToCamelCase(true);
        sqlSessionFactoryBean.setConfiguration(configuration);
        sqlSessionFactoryBean.setDataSource(xinyinDataSource);
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(XinYinDataSourceConfig.MAPPER_LOCATION));
        return sqlSessionFactoryBean.getObject();
    }

}
