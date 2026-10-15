package com.zevs.hotelcrm.health;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

class HealthControllerTest {
    @Test
    void healthReturnsStatusUp() {
        assertThat(new HealthController().health()).containsEntry("status", "UP");
    }
}
