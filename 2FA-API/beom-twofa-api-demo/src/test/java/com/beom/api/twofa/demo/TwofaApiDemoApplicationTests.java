package com.beom.api.twofa.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class TwofaApiDemoApplicationTests {

	@Test
	void contextLoads() {
		String[] args = new String[] {};
		TwofaApiDemoApplication.main(args);
		assertThat(args).isEmpty();
	}

}
