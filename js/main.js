// Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Toggle menú móvil
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Prevenir scroll del body cuando el menú está abierto
                if (navMenu.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            });

            // Cerrar menú al hacer clic en un enlace
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.style.overflow = '';
                });
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.style.overflow = '';
                }
            });

            // Cerrar menú con la tecla Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        }

        // Actualizar posición del menú al cambiar el tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Sistema de Modales para Servicios
        const modal = document.getElementById('serviceModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalIcon = document.getElementById('modalIcon');
        const modalImage = document.getElementById('modalImage');
        const modalIncludes = document.getElementById('modalIncludes');
        const closeModal = document.querySelector('.modal-close');
        const closeModalBtn = document.querySelector('.modal-close-btn');
        const modalContact = document.querySelector('.modal-contact');

        // Datos de los servicios
        const servicesData = {
            evaluaciones: {
                title: "Supervisión de Proyectos",
                icon: "fas fa-eye",
                image: "./resources/img/supervision-proyectos.jpeg",
                includes: [
                    "Nuestro servicio está orientado a garantizar que el Proyecto de ingeniería y/o construcción, cumpla con todos los requerimientos establecidos en calidad, seguridad, medio ambiente y responsabilidad social; además de supervisar trabajos especializado con riesgos críticos.",
                    "Nuestra planificación de proyecto se basa en los grupos de procesos de la Gerencia de Proyectos, participando desde el Kick off Meeting, identificando las necesidades del proyecto y realizando una adecuada planificación, basada en el cumplimiento de las políticas y objetivos de la empresa, estableciendo procedimientos y estándares de trabajo, realizando el aseguramiento y control de los procesos, y recibiendo la retroalimentación de los hallazgos como parte de la mejora continua.",
                    "Realizamos el seguimiento de la gestión de los subcontratistas, verificando el cumplimiento de lo establecido por los requisitos legales, del cliente y planes de gestión."
                ]
            },
            consultoria: {
                title: "Consultoría",
                icon: "fas fa-shield-alt",
                image: "./resources/img/consultoria.jpeg",
                includes: [
                    "Diagnóstico de Línea Base: Identificación de puntos críticos, No conformidades, Fortalezas, debilidades y oportunidades de mejora de su sistema de Gestión.",
                    "Análisis, control y Evaluación disergonómica, ruido ergonomía, iluminación.",
                    "Planificación estratégica de su sistema de Gestión Integrado",
                    "Implementación de Herramientas de Gestión basadas en el PMBOK, aplicadas al proceso de Calidad, Seguridad, Salud Ocupacional y medio Ambiente.",
                    "Asesoría en la implementación de Sistemas de gestión basados en los requisitos legales vigentes (Ley 29783, Ley 30222, D.S 005-2012, etc)"
                ]
            },
            ohsas: {
                title: "Asesoría para Certificaciones ISO",
                icon: "fas fa-certificate",
                image: "./resources/img/asesoria.jpeg",
                includes: [
                    "Diagnóstico del Sistema de Gestión Actual",
                    "Planificación del proyecto",
                    "Proceso del Diseño y Desarrollo",
                    "Establecimiento de acciones inmediatas necesarias",
                    "Elaboración de los manuales y procedimientos en coordinación con personal de su organización y asistencia en la implementación.",
                    "Capacitación al personal involucrado en el proyecto.",
                    "La auditoría interna a todo el sistema y Acompañamiento en la auditoria de certificación.",
                    "Asesoría en la elección del organismo para la auditoría de certificación."
                ]
            },
            auditorias: {
                title: "Auditorías",
                icon: "fas fa-search",
                image: "./resources/img/auditorias.jpg",
                includes: [
                    "Auditorías en cumplimiento de la Ley 27893 – Contamos con auditores registrados en el Ministerio de Trabajo",
                    "Planificación estratégica de auditorías internas",
                    "Implementación de procedimientos de Auditorías internas y evaluación de requisitos legales aplicables a su actividad productiva.",
                    "Auditorias de diagnóstico",
                    "Auditorias de Primera Parte (Auditorías internas)",
                    "Asesoría en procesos de auditoria de segunda parte (Auditoria a contratista o proveedores) y tercera parte (Auditoria por un organismo de certificación)"
                ]
            },
            capacitaciones: {
                title: "Capacitaciones",
                icon: "fas fa-graduation-cap",
                image: "./resources/img/capacitaciones.jpg",
                includes: [
                    "Inducción básica y cursos; según el D.S. 024-2016 EM / RNE / DS 005-2012 TR",
                    "Capacitación en Sistema de Gestión de Calidad, Seguridad Industrial, Salud en el Trabajo y Medio Ambiente para organizaciones públicas y privadas.",
                    "Capacitaciones / Certificaciones; Manejo defensivo, equipo pesado, trabajos en alto riesgo (trabajos en altura, bloqueo de energías, excavaciones y zanjas, riesgos eléctricos, etc)."
                ]
            },
            ambiental: {
                title: "Salud Ocupacional",
                icon: "fas fa-heartbeat",
                image: "./resources/img/salud-ocupacional.jpeg",
                includes: [
                    "Asesoría e Implementación de Sistemas de Gestión en Salud y Seguridad Ocupacional.",
                    "Auditorías del Sistema de Gestión en Salud Ocupacional.",
                    "Asesoría y conformación del Comité de Seguridad y Salud en el trabajo.",
                    "Reporte e Investigación de incidentes y accidentes en el trabajo.",
                    "Vigilancia de la Salud de los trabajadores: Médico Ocupacional en empresas.",
                    "Monitoreo de Programas de Vigilancia Ocupacional.",
                    "Ergonomía.",
                    "Enfermería Ocupacional.",
                    "Psicología Ocupacional (Asesoría, Monitoreos, Programas Preventivos).",
                    "Nutrición (Programa de Vida Saludable).",
                    "Capacitaciones en Seguridad y Salud Ocupacional.",
                    "Monitoreo de Programas de Vigilancia."
                ]
            }
        };

        // Event listeners para botones de servicios
        document.querySelectorAll('.service-info-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceType = btn.getAttribute('data-service');
                openServiceModal(serviceType);
            });
        });

        // Función para abrir el modal
        function openServiceModal(serviceType) {
            const service = servicesData[serviceType];
            if (!service) return;

            // Actualizar contenido del modal
            modalTitle.textContent = service.title;
            modalIcon.className = service.icon;
            modalImage.src = service.image;
            modalImage.alt = service.title;

            // Actualizar lista de inclusiones
            modalIncludes.innerHTML = '';
            service.includes.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalIncludes.appendChild(li);
            });

            // Mostrar modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        // Función para cerrar el modal
        function closeServiceModal() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        // Event listeners para cerrar el modal
        closeModal.addEventListener('click', closeServiceModal);
        closeModalBtn.addEventListener('click', closeServiceModal);

        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeServiceModal();
            }
        });

        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeServiceModal();
            }
        });

        // Al hacer clic en "Solicitar Cotización", cerrar modal y ir a contacto
        modalContact.addEventListener('click', () => {
            closeServiceModal();
        });

// Sistema de Carrusel Hero
class HeroCarousel {
    constructor() {
        this.carousel = document.querySelector('.hero-carousel');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.currentSlideSpan = document.querySelector('.current-slide');
        this.totalSlidesSpan = document.querySelector('.total-slides');
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        if (!this.carousel || this.slides.length === 0) return;
        
        // Configurar contador de slides
        if (this.totalSlidesSpan) {
            this.totalSlidesSpan.textContent = this.totalSlides;
        }
        
        // Event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Auto-play
        this.startAutoPlay();
        
        // Pausar auto-play al hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Actualizar contador inicial
        this.updateSlideCounter();
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.isTransitioning = true;
        
        // Remover clase activa del slide actual
        this.slides[this.currentIndex].classList.remove('active');
        
        // Actualizar índice
        this.currentIndex = index;
        
        // Agregar clase activa al nuevo slide
        this.slides[this.currentIndex].classList.add('active');
        
        // Actualizar contador
        this.updateSlideCounter();
        
        // Resetear flag de transición
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
        
        // Reiniciar auto-play
        this.restartAutoPlay();
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    updateSlideCounter() {
        if (this.currentSlideSpan) {
            this.currentSlideSpan.textContent = this.currentIndex + 1;
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    restartAutoPlay() {
        this.startAutoPlay();
    }

    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const heroCarousel = new HeroCarousel();
    
    // Conectar botones del carrusel con modales
    document.querySelectorAll('.carousel-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceType = btn.getAttribute('data-service');
            openServiceModal(serviceType);
        });
    });
});