package org.example.reactiveweb;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/react")
@RequiredArgsConstructor
public class ReactiveController {

    private static final Logger log = LoggerFactory.getLogger(ReactiveController.class);
    private WebClient webClient = WebClient.builder()
            .baseUrl("http://localhost:7070/").build();

    @GetMapping(value = "/products", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Product> get(){
      return webClient.get()
                .uri("/demo01/products")
                .retrieve()
                .bodyToFlux(Product.class)
                .doOnNext(productFlux -> {
                    log.info(productFlux.toString());
                });
    }
}
